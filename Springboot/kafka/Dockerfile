FROM openjdk:19-jdk-alpine as build
WORKDIR /workspace/app

COPY ../mvnw .
COPY ../.mvn .mvn
RUN dos2unix mvnw
COPY ../pom.xml .
COPY ../src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:19-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.kafka.SpringbootKafkaApplication"]