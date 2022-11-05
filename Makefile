cloc:
	cloc --exclude-dir=node_modules *

run:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml up -d

run-local:
	docker-compose --env-file .env.local -f apn-devops/docker-compose.yaml up -d

run-db-local:
	docker-compose --env-file .env.local -f apn-devops/docker-compose.yaml up -d postgres
	docker-compose --env-file .env.local -f apn-devops/docker-compose.yaml up -d pgadmin

run-backend:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml up -d backend

run-backend-local:
	docker-compose --env-file .env.local -f apn-devops/docker-compose.yaml up -d backend

stop:
	docker-compose --env-file .env -f apn-devops/docker-compose.yaml down
