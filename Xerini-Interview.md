# Whats been done

### Server
Both endpoints for adding end retrieving geo-json data have been implemented.

Additionally a new endpoint for the purpose of deleting the stored geo-json data has been implemented.

The geo-json is being stored in a text file called "data.txt" which is located in the resources folder. The mentioned text folder is being created on startup if it doesn't exist already.

### UI

The onMapClick() method has been implemented so that on each click a post request containing the coordinates is being sent to the "/add" endpoint on the server.

A small modal at the bottom of the page containing the location information with the help of the nominatim reverse geocoding api has been added.

A clear button has been added to the top right of the page in order to clear the stored pinPoints on the map.

### Testing

Tests for all endpoints have been implemented.

No tests for the UI were implemented.

### What I would want to do different

Assuming I had more time the first feature I would have wanted to add would be to not store every location clicked on the map but only those which have been confirmed by the user with the help of another UI component.

Another topic I would have liked to get more exposure to would be testing as I feel my currently implemented tests are basic.





