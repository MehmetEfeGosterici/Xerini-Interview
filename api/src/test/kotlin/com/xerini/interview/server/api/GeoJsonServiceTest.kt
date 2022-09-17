package com.xerini.interview.server.api


import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class GeoJsonServiceTest {

    init {
        Files.createDirectories(Paths.get("api/src/main/resources"))
        File("api/src/main/resources/data.txt").createNewFile()

    }

    private val geoJsonService: GeoJsonService = GeoJsonService()

    @Test
    fun `retrieves geo-json coordinate data`() {
        val result = geoJsonService.getGeoJson()
        assertNotNull(result)
    }

    @Test
    fun `returns geo-json coordinate data`(){
        val result = geoJsonService.addPoint(RequestBody(listOf(1.0,2.0),"test String")).status
        assertEquals(200,result)
    }

    @Test
    fun `deletes existing stored data`(){
        val result = geoJsonService.clearPoints().status
        assertEquals(200,result)
    }
}