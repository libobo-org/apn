# devops

## init new server

```sh
cd ~/work/lackhite/apn
scp apn-devops/init-vps.sh root@45.9.26.8:/root/apn/init-vps.sh
scp apn-devops/docker-compose.yaml root@45.9.26.8:/root/apn/docker-compose.yaml
ssh root@45.9.26.8
cd /root/apn
bash init-vps.sh
docker compose up
```

[pgadmin](http://45.9.26.8:5059)

## backup db from old server

```sh
ssh ubuntu@51.250.65.254
docker exec -it apn-postgres /bin/bash
pg_dump -U postgres apn-db | gzip > dump.sql.gz
exit
sudo docker cp apn-postgres:/dump.sql.gz dump.sql.gz
exit
cd ~/work/lackhite/apn
scp ubuntu@51.250.65.254:~/apn/dump.sql.gz dump.sql.gz
```

## restore db to new server

```sh
scp dump.sql.gz root@45.9.26.8:/root/apn/dump.sql.gz
ssh root@45.9.26.8
cd /root/apn
gunzip < dump.sql.gz | docker exec -i apn-postgres psql -U postgres -d apn-db
```

## backup db from new server

```sh
ssh root@45.9.26.8
docker exec -it apn-postgres /bin/bash
pg_dump -U postgres apn-db | gzip > dump.sql.gz
exit
docker cp apn-postgres:/dump.sql.gz /root/apn/dump.sql.gz
exit
cd ~/work/lackhite/apn
scp root@45.9.26.8:/root/apn/dump.sql.gz dump.sql.gz
```
