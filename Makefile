cloc:
	cloc --exclude-dir=node_modules *

run:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml up -d

stop:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml down
