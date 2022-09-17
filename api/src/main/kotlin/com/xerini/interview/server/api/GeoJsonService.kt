@file:Suppress("unused")

package com.xerini.interview.server.api

import com.xerini.interview.util.GsonUtil
import java.io.File
import java.util.*
import java.util.concurrent.CopyOnWriteArrayList
import javax.ws.rs.*
import javax.ws.rs.core.MediaType.APPLICATION_JSON
import javax.ws.rs.core.Response


data class Example(var name: String, var age: Int, var list: List<String>) {
    val static: String = "this is always the same"
}

@Path("/geo-json")
class GeoJsonService {
    private val allCoordinates = CopyOnWriteArrayList<List<Double>>()

    init {
        File("api/src/main/resources/data.txt").createNewFile()
    }

    @GET
    @Produces(APPLICATION_JSON)
    fun getGeoJson(): String {
        var geoJsonObject = GeoJsonObject(listOf())
        val geoJsonFeatureArray: List<String> = File("api/src/main/resources/data.txt").readText().split("|")
        for (geoJsonFeature in geoJsonFeatureArray) {
            geoJsonObject.features += GsonUtil.gson.fromJson(geoJsonFeature, GeoJsonFeature::class.java)
        }
        return GsonUtil.gson.toJson(geoJsonObject)
    }

    @Path("/add")
    @POST
    @Consumes(APPLICATION_JSON)
    fun addPoint(requestBody: RequestBody): Response {
        val geoJsonFeature: GeoJsonFeature = GeoJsonFeature(GeometryData((requestBody.coordinates)), mapOf<String, Any>(Pair("pointLabel", requestBody.pointLabel)))
        if (File("api/src/main/resources/data.txt").readText().isEmpty()) {
            File("api/src/main/resources/data.txt").appendText(GsonUtil.gson.toJson(geoJsonFeature))
            return Response.ok().build()
        }
        File("api/src/main/resources/data.txt").appendText("|" + GsonUtil.gson.toJson(geoJsonFeature))
        return Response.ok().build()
    }

    @Path("/clear")
    @DELETE
    fun clearPoints(): Response {
        val geoJsonFeature: GeoJsonFeature = GeoJsonFeature(GeometryData(listOf()), mapOf<String, Any>(Pair("key", "value")))
        File("api/src/main/resources/data.txt").writeText("")
        File("api/src/main/resources/data.txt").appendText(GsonUtil.gson.toJson(geoJsonFeature))
        return Response.ok().build()
    }
}

data class GeoJsonObject(var features: List<GeoJsonFeature>) {
    val type: String = "FeatureCollection"
}

data class GeoJsonFeature(val geometry: GeometryData?, val properties: Map<String, Any?> = emptyMap()) {
    val type: String = "Feature"
}

data class GeometryData(val coordinates: List<Double>) {
    val type: String = "Point"
}

data class RequestBody(val coordinates: List<Double>, val pointLabel: String) {}