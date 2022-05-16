plugins {
    java
    kotlin("jvm") version "1.6.10"
}

dependencies {
    implementation("org.slf4j:slf4j-api:1.7.36")
    implementation("ch.qos.logback:logback-core:1.2.11")
    implementation("ch.qos.logback:logback-classic:1.2.11")
    implementation("com.typesafe:config:1.4.2")
    implementation("org.eclipse.jetty:jetty-server:9.4.45.v20220203")
    implementation("org.eclipse.jetty:jetty-servlet:9.4.45.v20220203")
    implementation("org.glassfish.jersey.core:jersey-common:2.35")
    implementation("org.glassfish.jersey.core:jersey-server:2.35")
    implementation("org.glassfish.jersey.containers:jersey-container-servlet:2.35")
    implementation("org.glassfish.jersey.inject:jersey-hk2:2.35")
    implementation("javax.xml.bind:jaxb-api:2.3.1")
    implementation("com.sun.xml.bind:jaxb-core:3.0.2")
    implementation("com.sun.xml.bind:jaxb-impl:3.0.2")
    implementation("javax.activation:activation:1.1.1")
    implementation("javax.activation:activation:1.1.1")
    implementation("com.google.code.gson:gson:2.9.0")

    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
    testImplementation("org.hamcrest:hamcrest:2.2")
}
