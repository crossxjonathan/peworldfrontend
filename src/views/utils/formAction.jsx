export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if (element.validation.required) {
        const valid = element.value.trim() !== "";
        const message = `${!valid ? 'Please fill the form' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
}
export const update = (element,  formdata) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }
    newElement.value = element.event.target.value;
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormdata[element.id] = newElement;
    return newFormdata;

}

export const generateData = (formdata) => {
    let data = {}

    for (let key in formdata) {
        data[key] = formdata[key].value;
    }

    return data;
}

export const isDataValid = (formdata) => {
    let isvalid = true;

    for (let key in formdata) {
        isvalid = formdata[key].valid && isvalid;
    }

    return isvalid;
}