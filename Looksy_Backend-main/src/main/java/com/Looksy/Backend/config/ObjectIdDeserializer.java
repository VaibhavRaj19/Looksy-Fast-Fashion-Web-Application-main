package com.Looksy.Backend.config; // This is the package where this file resides

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.bson.types.ObjectId;

import java.io.IOException;

/**
 * Custom Jackson JsonDeserializer for org.bson.types.ObjectId.
 * This deserializer converts a hexadecimal string from JSON into an ObjectId object
 * when JSON data is deserialized into a Java object.
 *
 * Example: "65b267104a3e8774e1d711f7" in JSON becomes ObjectId("65b267104a3e8774e1d711f7") in Java.
 */
public class ObjectIdDeserializer extends JsonDeserializer<ObjectId> {

    @Override
    public ObjectId deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        String id = jsonParser.getText();
        // If the string is null or empty, return null ObjectId
        if (id == null || id.isEmpty()) {
            return null;
        }
        // Attempt to create an ObjectId from the string.
        // It's good practice to add more robust error handling here if the string
        // might not always be a valid ObjectId hex string (e.g., try-catch new ObjectId(id))
        return new ObjectId(id);
    }
}