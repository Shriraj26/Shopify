function validateDto(ajvValidate) {

    return (req, res, next) => {

        const valid = ajvValidate(req.body);
        console.log(valid);
        if (!valid) {
            const errors = ajvValidate.errors;
            return res.status(400).json({
                status: "Error",
                message: "Validation Error",
                errors: errors,
            });
        }
        next();
    }
}

module.exports = validateDto;

