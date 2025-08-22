/* eslint-disable react/prop-types */
import React from 'react';

const FormField = ({
    id,
    formdata,
    change
}) => {

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid) {
            errorMessage = (
                <div>
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = ({
        id,
        formdata,
        change
    }) => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        <h6>{formdata.config.name}</h6>
                        <input
                            {...formdata.config}
                            value={formdata.value || ''}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                return formTemplate = null;
        }

        return formTemplate;
    }


    return (
        <div className='formGroup'>
            <div className='formWrapper'>
                {
                    renderTemplate({
                        id,
                        formdata,
                        change
                    })
                }
            </div>
        </div>
    )
}

export default FormField;