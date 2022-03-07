import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Command from './components/Command';
import InputLine from "./components/InputLine";

function App() {

    const [commands, setCommands] = useState([])
    const [strings, setStrings] = useState({})
    const [expire, setExpire] = useState({})
    const [snapshot, setSnapshot] = useState({strings: {}, expire: {}})

    const expireHandler = () => {
        let cur = new Date()
        cur = cur.getTime()
        for (const [key, value] of Object.entries(expire)) {
            if (cur >= value[0]){
                delete strings[key]
                delete expire[key]
            }
        }
    }

  const setCommand = (input) => {
        let res = executeCommand(input)
      if (res[0] === 'SMEMBERS' || res[0] === 'KEYS' || res[0] === 'SINTER'){
          let tmp = ""
          res[1].forEach(a => tmp += (a+" "))
          res[1] = tmp
      }
      setCommands([[input, res[1]],...commands])
  }

  const executeCommand = (command) => {
      //TODO remember to throw if command is not valid
      command = command.split(' ')
      if (command.length === 3 && command[0] === 'SET' ){
          let tmp = strings
          tmp[command[1]] = command[2]
          setStrings(tmp)
          return ['SET', 'SUCCESS']
      }
      else if (command.length === 2 && command[0] === 'GET' ){
          if (command[1] in strings){
              return ['GET', strings[command[1]]]
          }else{
              return ['GET', 'ERROR: GET Failed: Key not found error']
          }

      }
      else if (command.length > 2 && command[0] === 'SADD'){
          if (command[1] in strings && command[1] instanceof Set){
              let tmp = strings
              for(let i=2;i<command.length;i++){
                  tmp[command[1]].add(command[i])
              }
            setStrings(tmp)
              return ['SADD', 'SUCCESS']
          }
          else if(command[1] in strings && !(command[1] instanceof Set)) {
              return ['SADD', 'ERROR: Key Occupied: Data at key is not a set']
          }else
          {
              let tmp = strings
              strings[command[1]] = new Set([])
              for(let i=2;i<command.length;i++){
                  tmp[command[1]].add(command[i])
              }
            setStrings(tmp)
              return ['SADD', 'SUCCESS']
          }
      }
      else if (command.length > 2 && command[0] === 'SREM'){
          if (command[1] in strings && command[1] instanceof Set){
              let tmp = strings
              for(let i=2;i<command.length;i++){
                  if (tmp[command[1]].has(command[i])){
                      tmp[command[1]].delete(command[i])
                  }else{
                      return ['SREM', 'ERROR: SREM Failed: Item not found error']
                  }

              }
            setStrings(tmp)
              return ['SADD', 'SUCCESS']
          }else if(command[1] in strings && !(command[1] instanceof Set)) {
              return ['SADD', 'ERROR: Key Occupied: Data at key is not a set']
          }else{
              return ['SREM', 'ERROR: SREM Failed: Key not found error']
          }
      }
      else if (command.length === 2 && command[0] === 'SMEMBERS'){
          if (command[1] in strings){
              return ['SMEMBERS', strings[command[1]]]
          }else{
              return ['SMEMBERS', 'ERROR: SMEMBERS Failed: Key not found error']
          }
      }
      else if (command.length === 1 && command[0] === 'KEYS'){
          return ['KEYS', Object.keys(strings)]
      }
      else if (command.length === 2 && command[0] === 'DEL'){
          if (command[1] in strings){
              delete strings[command[1]]
              return ['DEL', 'SUCCESS']
          }else{
              return ['DEL', 'ERROR: DEL Failed: Key not found error']
          }
      }
      else if (command.length === 3 && command[0] === 'EXPIRE'){
          if (command[1] in strings){
              let tmp = expire
              let cur = new Date()
              cur = cur.getTime()
              try{
                  cur +=  parseInt(command[2])*1000
              }catch(e){
                  return ['EXPIRE', 'ERROR: EXPIRE Failed: Cannot convert input into seconds']
              }
              tmp[command[1]] = [cur, command[2].toString()]
              setExpire(tmp)
              return ['EXPIRE', 'SUCCESS']
          }
      }
      else if (command.length === 2 && command[0] === 'TTL'){
          if (command[1] in expire){
              let cur = new Date()
              cur = cur.getTime()
              return ['TTL', expire[command[1]][1]+" seconds total, "+((expire[command[1]][0]-cur)/1000).toString()+" seconds left"]
          }else if (command[1] in strings){
              return ['TTL', 'No timeout specified']
          }else{
              return ['TTL', 'ERROR: TTL Error: Key not found error']
          }
      }
      else if (command.length === 1 && command[0] === 'SAVE'){
          let tmp = snapshot
          tmp['strings'] = JSON.parse(JSON.stringify(strings))
          tmp['expire'] = JSON.parse(JSON.stringify(expire))
          setSnapshot(tmp)
          return ['SAVE', 'SUCCESS']
      }
      else if (command.length === 1 && command[0] === 'RESTORE'){
          setCommands(snapshot['commands'])
          setStrings(snapshot['strings'])
          setExpire(snapshot['expire'])
          return ['RESTORE', 'SUCCESS']
      }
      else if (command.length > 1 && command[0] === 'SINTER'){
          let tmp = []
          strings[command[1]].forEach(item => {
              let flag = true
              for(let i=2;i<command.length;i++){
                  if (!strings[command[i]].has(item)){
                      flag = false
                      break

                  }
              }
              if(flag){
                  tmp.push(item)
              }
          })
          return ['SINTER', tmp]
      }
      else{
          return ['SYNTAX', 'ERROR: Command Not Found']
      }
  }
  return (
      <div>
    <div className="container">
      {commands.map((c) => (
        <Command command = {c[0]} status = {c[1]}/>
      ))}
    </div>
    <div className="input-line">
      <InputLine setCommand={setCommand} expire = {expireHandler}/>
    </div>
      </div>
  );
}

export default App;
