cloc:
	cloc --exclude-dir=node_modules *

run-db:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml up -d

stop-db:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml down
