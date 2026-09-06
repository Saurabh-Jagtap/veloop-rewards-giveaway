import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate = (schema: ZodType, target: ValidationTarget = "body") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            res.status(400).json({
                success: false,
                code: "VALIDATION_ERROR",
                message: "Validation failed",
                errors: result.error.issues,
            });

            return;
        }

        if (target === "query") {
            res.locals.validatedQuery = result.data;
        }
        else if (target === "params") {
            res.locals.validatedParams = result.data;
        }
        else {
            req.body = result.data;
        }

        next();
    };
};