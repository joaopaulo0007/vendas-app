import { InputHTMLAttributes } from "react";
import { FormatUtils } from '@4us-dev/utils';

const formatUtils = new FormatUtils();

interface input_props extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string; 
    id: string;
    columns_class?: string;
    error?: string;
    formater?: (value: string) => string;
}

export default function Input({
    onChange, label, columns_class, id, formater, ...props
}: input_props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formater) {
            e.target.value = formater(e.target.value);
        }
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`field  column ${columns_class}`}>
            <label htmlFor={id}>{label}</label>
            <div className='control'>
                <input
                    id={id}
                    {...props}
                    onChange={handleChange}
                    className="input"
                />
                {
                    props.error && <p className="help is-danger">
                        {props.error}
                    </p>
                }
            </div>
        </div>
    );
}

export function InputCPF(props: input_props) {
    return (
        <Input
            {...props}
            formater={formatUtils.formatCPF}
        />
    );
}

export function InputTelefone(props: input_props) {
    return (
        <Input {...props}
            formater={formatUtils.formatPhone}
        />
    );
}

export function InputData(props: input_props) {
    function FormData(value: string): string {
        if (!value) {
            return '';
        }
        const data = formatUtils.formatOnlyIntegers(value);
        const size = data.length;
        if (size <= 2) {
            return data;
        }
        if (size <= 4) {
            return data.substr(0, 2) + '/' + data.substr(2, 2);
        } else {
            return data.substr(0, 2) + '/' + data.substr(2, 2) + '/' + data.substr(4, 4);
        }
    }

    return (
        <Input {...props}
            formater={FormData}
            maxLength={10}
        />
    );
}
