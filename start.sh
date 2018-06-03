#!/usr/bin/env bash
(cd server/ && npm install && npm start & cd client/ && npm install && npm start)
$SHELL
