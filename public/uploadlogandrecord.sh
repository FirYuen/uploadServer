#!/bin/bash
serverIP='192.168.50.198:8887'
uploadTime=`curl -s "$serverIP"/now`
upaddr=`ifconfig wlan0 |grep inet| awk '{print $2}'|grep 192`

rm -f /data/log.tar.gz
mret=`ntfctl  sys0 {\"type\":\"system\",\"sys_get\":\"get_all\"}`
FW_MCU=`cjp "${mret}" string fw_mcu`
echo ${FW_MCU} > /data/log/fw_mcu
cp -av  /tmp/log  /data/log
sync
cp   /etc/os-release  /data/log
cp -av /data/record /data/log
tar zcvf /data/log.tar.gz /data/log
sync


curl -s "$serverIP/public/success.ogg" -o /tmp/success.ogg
# echo $uploadTime
# echo $upaddr
curl $serverIP -F "file=@/data/log.tar.gz" -F "time=$uploadTime" -F "user=$upaddr"  --connect-timeout 2 -#| tee /dev/null

ogg123 /tmp/success.ogg >/dev/null
rm -rf /data/log/*
rm -rf /data/record/img*
sleep 3
reboot -f

