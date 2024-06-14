//JSON PROMT
let contentPromtJSON = `Ты - профессиональный русский диетолог, который даёт специализированные рекомендации на запрос пользователя. Ты пишешь на безупречном русском языке. Твоя задача - сформировать диетический план по запросу следующей диеты:`

let promtJSON = `
Use only English to answer.

make up a low-calorie diet for 1 day. Provide the response in json format using the following example:
{
    "<meal time>": {
        "<dish name>": {
            "description": "<dish description>",
            "ingredients":{
                "<ingredient name>": {
                    "type of product": "<type of product>"
                }
            }
        }
    }                                
}

Example of an answer to guide you:
{
    "Breakfast": {
        "Oatmeal with Berries": {
            "description": "Instead of traditional sugary breakfast cereal, try oatmeal with fresh or frozen berries (such as strawberries, blueberries, or blackberries) for a nutritious and flavorful start to the day.",
            "ingredients": {
                "Oats": {
                    "type of product": "Dairy products"
                },
                "Berries": {
                    "type of product": "Fruits"
                },
                "Milk": {
                    "type of product": "Dairy products"
                }
            }
        }
    },
    "lunch": {
        "grilled chicken salad": {
            "description": "Grilled chicken breast with mixed greens, sliced tomatoes, cucumbers, andred onion, topped with a light vinaigrette dressing for a filling and healthy lunch.",
            "ingredients": {
                "grilled chicken Breast": {
                    "type of product": "meat products"
                },
                "mixed greens": {
                    "type of product": "vegetables"
                },
                "tomatoes": {
                    "type of product": "vegetables"
                },
                "cucumbers": {
                    "type of product": "vegetables"
                },
                "red Onion": {
                    "type of product": "vegetables"
                },
                "low-Fat Dressing": {
                    "type of product": "dressings"
                }
            }
        }
    },
    "Dinner": {
        "Baked Salmon with Steamed Vegetables": {
            "description": "Flaky baked salmon with a side of steamed vegetables (such as broccoli, carrots, and green beans) for a balanced and low-calorie dinner.",
            "ingredients": {
                "Salmon Fillet": {
                    "type of product": "Fish and seafood"
                },
                "Broccoli": {
                    "type of product": "Vegetables"
                },
                "Carrots": {
                    "type of product": "Vegetables"
                },
                "Green Beans": {
                    "type of product": "Vegetables"
                },
                "Lemon": {
                    "type of product": "Dairy products"
                },
                "Herbs": {
                    "type of product": "Herbs and spices"
                }
            }
        }
    }
}

You can't use square brackets []

The main point of this format is to decompose meals in a structured way.
A day (day of the week) usually consists of 3 meals (meal time), each meal contains a dish (dish name), which in turn contains ingredients.
ingredients also contain the necessary information about themselves.

- "meal time" field, can contain values such as Breakfast, Lunch, Dinner, Snack.
- <dish description> must include a brief description of the recipe for the dish
- the "ingredients" field is always written in one form only.
- The "ingredient name" field should contain one word that generally describes the ingredient. For example: milk, egg, avocado, flour, cheese, sausage
- the "type of product" field can be one of the following list: "fruits, vegetables, meat products, fish and seafood, bakery products, dairy products, drinks, sweets, frozen products"

It is also worth considering that the fields with <> symbols inside are variables into which you will write the necessary values

Check the integrity of the JSON file response, don't make it too cluttered, close all brackets to the end.
`

module.exports = {
    contentPromtJSON,
    promtJSON
}