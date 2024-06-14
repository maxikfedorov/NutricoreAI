function findBracketsContent(text) {
    if (typeof text !== 'string') {
        try {
            text = text.toString();
        } catch (e) {
            throw new Error('Невозможно преобразовать входные данные в строку');
        }
    }

    const firstBracket = text.indexOf('{');
    const lastBracket = text.lastIndexOf('}');

    if (firstBracket === -1) {
        text = '{' + text;
    }

    if (lastBracket === -1) {
        text = text + '}';
    }

    const textJSON = text.slice(firstBracket, lastBracket + 1);

    return textJSON;
}

function refineText(text) {
    return text
        .replace(/\s\s+/g, ' ')
        .replace(/\n/g, '')
        .replace(/</g, '')
        .replace(/>/g, '');
}

function fixJson(text) {
    let stack = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
            stack.push('{');
        } else if (text[i] === '}') {
            if (stack.length === 0) {
                throw new Error('Некорректный JSON: лишняя закрывающая скобка');
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        text += '}';
        stack.pop();
    }

    return text;
}

// function visualizeObject(obj, level = 1) {
//     let html = '';
//     let tag = '';
//     switch (level) {
//         case 1:
//             tag = 'h2';
//             break;
//         case 2:
//             tag = 'h3';
//             break;
//         case 3:
//             tag = 'p';
//             break;
//         case 4:
//         case 5:
//             tag = 'ul';
//             break;
//         default:
//             tag = 'ul';
//             break;
//     }

//     for (let key in obj) {
//         let value = obj[key];
//         if (tag === 'ul') {
//             html += '<li>' + key + ': ';
//         } else {
//             html += '<' + tag + '>' + key + ': ';
//         }

//         if (typeof value === 'object' && value !== null) {
//             html += visualizeObject(value, level + 1);
//         } else {
//             html += value;
//         }

//         if (tag === 'ul') {
//             html += '</li>';
//         } else {
//             html += '</' + tag + '>';
//         }
//     }

//     if (tag === 'ul') {
//         html = '<' + tag + '>' + html + '</' + tag + '>';
//     }

//     return html;
// }

function processChadoData(data) {
    if (typeof data === 'object') {
        console.log('AI сразу дал нам объект, ну ничего себе');

        return JSON.stringify(data);
    }

    let result = refineText(data);

    result = findBracketsContent(result);

    result = fixJson(result);

    try {
        return result;
    } catch (error) {
        console.error(
            'Ошибка при преобразовании в JSON в финале: ',
            error,
            result
        );

        return 'Ошибка при преобразовании в JSON в финале';
    }
}

module.exports = {
    processChadoData,
    findBracketsContent,
    fixJson,
};
