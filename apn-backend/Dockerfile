FROM gradle:jdk17 as builder
WORKDIR /app
COPY ./apn-backend .
RUN ./gradlew buildFatJar

FROM openjdk:17 as backend
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8080:8080
CMD ["java", "-jar", "./build/libs/fat.jar"]
