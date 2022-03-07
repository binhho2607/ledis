# Ledis



## Description

Ledis is a light-weight version of Redis that is implemented as a web-based CLI. 

## Installation
1. Fork and clone the Git repository onto your your local device.
2. While in the directory, run npm install to install the necessary dependencies for the program.
3. While in the directory, run `npm start` to run the main program. You can then access the program via your browser by navigating to localhost:3000. The port might be different if it is inhabited by another program.

## Available Commands
### `SET [key] [value]`
Set a string value, always overwriting what is saved under key

### `GET [key]`
Get a string value at key

### `SADD [key] [value1] [value2] ...`
Add values to set stored at key

### `SREM [key] [value1] [value2] ...`
Remove values from set

### `SMEMBERS [key]`
Return array of all members of set

### `SINTER [key1] [key2] ...`
Set intersection among all set stored in specified keys. Return array of members of the result set

### `KEYS`
List all available keys

### `DEL [key]`
Delete a key

### `EXPIRE [key] [seconds]`
Set a timeout on a key, seconds is a positive integer (by default a key has no expiration). Return the number of seconds if the timeout is set

### `TIL [key]`
Query the timeout of a key

### `SAVE`
Save current state in a snapshot

### `RESTORE`
Restore from the last snapshot


## Design and Implementations
For this project, I used React to build the front-end of the CLI as well as Node.js as the backbone of the program. For the data structures required, I used React states as well as JavaScript's object literals and sets as the underlying data structures for the more abstract data structures. For the expiry feature, I used JavaScript's built-in Data data type to store the timeout time for the strings, and if the current time exceeds the timeout limit, then the key-value pair of the string will be deleted. For the snapshot feature, I used React state to store the current data state when the user calls `SAVE`, and when the user calls `RESTORE`, I set the data state of the program to the data state stored earlier.

## Challenges
This project is quite challenging because I am not proficient at utilizing CLIs myself, so I have to figure how it works at its core before jumping into building Ledis. Also, I have not used Redis itself before, so this project is very interesting from my perspective.
