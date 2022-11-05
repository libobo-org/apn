# devops

## init new server

```sh
cd apn
scp apn-devops/init-vps.sh root@<IP>:/root/apn/init-vps.sh
scp apn-devops/docker-compose.yaml root@<IP>:/root/apn/docker-compose.yaml
ssh root@<IP>
cd /root/apn
bash init-vps.sh
docker compose up
```

[pgadmin](http://<IP>:5059)

## backup db from old server

```sh
ssh ubuntu@<OLD_IP>
docker exec -it apn-postgres /bin/bash
pg_dump -U postgres apn-db | gzip > dump.sql.gz
exit
sudo docker cp apn-postgres:/dump.sql.gz dump.sql.gz
exit
cd apn
scp ubuntu@<OLD_IP>:~/apn/dump.sql.gz dump.sql.gz
```

## restore db to new server

```sh
scp dump.sql.gz root@<IP>:/root/apn/dump.sql.gz
ssh root@<IP>
cd /root/apn
gunzip < dump.sql.gz | docker exec -i apn-postgres psql -U postgres -d apn-db
```

## backup db from new server

```sh
ssh root@<IP>
docker exec -it apn-postgres /bin/bash
pg_dump -U postgres apn-db | gzip > dump.sql.gz
exit
docker cp apn-postgres:/dump.sql.gz /root/apn/dump.sql.gz
exit
cd ~/work/lackhite/apn
scp root@<IP>:/root/apn/dump.sql.gz dump.sql.gz
```
