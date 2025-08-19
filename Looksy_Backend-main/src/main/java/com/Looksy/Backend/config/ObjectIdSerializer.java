package com.Looksy.Backend.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

/**
 * Custom Jackson JsonSerializer for org.bson.types.ObjectId.
 * This serializer converts an ObjectId object into its hexadecimal string representation
 * when a Java object is serialized into JSON.
 *
 * Example: ObjectId("65b267104a3e8774e1d711f7") becomes "65b267104a3e8774e1d711f7" in JSON.
 */
public class ObjectIdSerializer extends JsonSerializer<ObjectId> {

    @Override
    public void serialize(ObjectId objectId, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        // If the ObjectId is null, write a JSON null value
        if (objectId == null) {
            jsonGenerator.writeNull();
        } else {
            // Otherwise, write the hexadecimal string representation of the ObjectId
            jsonGenerator.writeString(objectId.toHexString());
        }
    }
}