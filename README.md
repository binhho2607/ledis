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
