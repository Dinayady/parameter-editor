import { Component, type FC } from "react";

// Types
export interface Param {
    id: number;
    name: string;
    type: 'string';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Model {
    paramValues: ParamValue[];
    colors: any[];
}

export interface Props {
    params: Param[];
    model: Model;
}

interface State {
    values: Record<number, string>;
}

// Param input 
type ParamInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const StringInput: FC<ParamInputProps> = ({ value, onChange }) => (
    <input
        data-testid="param-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

const inputRegistry: Record<Param['type'], FC<ParamInputProps>> = {
    string: StringInput,
};


// ParamEditor
export class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const initialValues: Record<number, string> = {};

        props.params.forEach((param) => {
            const found = props.model.paramValues.find(
                (v) => v.paramId === param.id
            );
            initialValues[param.id] = found ? found.value : '';
        });

        this.state = {
            values: initialValues,
        };
    }

    private updateValue = (paramId: number, value: string) => {
        this.setState((prev) => ({
            values: {
                ...prev.values,
                [paramId]: value,
            },
        }));
    };

    public getModel(): Model {
        return {
            ...this.props.model,
            paramValues: Object.entries(this.state.values).map(
                ([paramId, value]) => ({
                    paramId: Number(paramId),
                    value,
                })
            ),
        };
    }

    render() {
        const { params } = this.props;
        const { values } = this.state;

        return (
            <div>
                {params.map((param) => {
                    const InputComponent = inputRegistry[param.type];

                    return (
                        <div key={param.id}>
                            <label>{param.name}</label>
                            <InputComponent
                                value={values[param.id]}
                                onChange={(v) => this.updateValue(param.id, v)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
