#!/bin/bash
docker_name="htf/bamboo"
version="v1.0"
cnpm install
cnpm run build
docker_rmi=`docker images |grep $docker_name |  awk "{print $3}"`
if [ -n "$docker_rmi" ]
 then
   sudo docker rmi $(docker images |grep $docker_name |  awk "{print $3}")
fi
echo "----------docker 打包开始-------------"
sudo docker build  -t  htf/bamboo:v1.0 .
echo "-----------docker 打包完成------------"
