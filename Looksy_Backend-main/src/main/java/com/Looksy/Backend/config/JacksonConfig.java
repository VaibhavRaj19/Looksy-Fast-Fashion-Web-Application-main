package com.Looksy.Backend.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Module objectIdModule() {
        SimpleModule module = new SimpleModule();
        module.addSerializer(ObjectId.class, new ObjectIdSerializer());
        return module;
    }

    // Inner serializer class
    public static class ObjectIdSerializer extends com.fasterxml.jackson.databind.ser.std.StdSerializer<ObjectId> {
        public ObjectIdSerializer() {
            super(ObjectId.class);
        }

        @Override
        public void serialize(ObjectId value, com.fasterxml.jackson.core.JsonGenerator gen,
                              com.fasterxml.jackson.databind.SerializerProvider provider) throws java.io.IOException {
            if (value == null) {
                gen.writeNull();
            } else {
                gen.writeString(value.toHexString());
            }
        }
    }
}
