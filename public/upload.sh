#!/bin/bash
serverIP='192.168.123.11:8887'
uploadTime=`curl -s "$serverIP"/now`
upaddr=`ifconfig wlan0 |grep inet| awk '{print $2}'|grep 192`
# echo $uploadTime
# echo $upaddr
curl $serverIP -F "file=@/data/log.tar.gz" -F "time=$uploadTime" -F "user=$upaddr"  --connect-timeout 2 -#| tee /dev/null
