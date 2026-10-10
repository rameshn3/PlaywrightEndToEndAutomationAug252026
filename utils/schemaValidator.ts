import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
    allErrors: true,
    strict: false
});

// Enable date, email, uri, etc.
addFormats(ajv);

export function validateSchema(
    data: any,
    schema: object
): boolean {

    const validate = ajv.compile(schema);

    const valid = validate(data);

    if (!valid) {
        console.error(
            "Schema validation errors:",
            validate.errors
        );
    }

    return valid as boolean;
}