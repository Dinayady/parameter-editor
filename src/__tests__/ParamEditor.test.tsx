import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ParamEditor, type Model, type Param } from '../components/ParamEditor';

const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 'макси' },
    ],
    colors: [],
};

describe('ParamEditor', () => {
    it('renders fields based on params', () => {
        render(<ParamEditor params={params} model={model} />);

        expect(screen.getByText('Назначение')).toBeInTheDocument();
        expect(screen.getByText('Длина')).toBeInTheDocument();
        expect(screen.getAllByTestId('param-input')).toHaveLength(2);
    });

    it('initializes values from model.paramValues', () => {
        render(<ParamEditor params={params} model={model} />);

        const inputs = screen.getAllByTestId('param-input') as HTMLInputElement[];

        expect(inputs[0].value).toBe('повседневное');
        expect(inputs[1].value).toBe('макси');
    });

    it('returns correct model from getModel()', () => {
        const ref = createRef<ParamEditor>();

        render(<ParamEditor ref={ref} params={params} model={model} />);

        const inputs = screen.getAllByTestId('param-input') as HTMLInputElement[];

        fireEvent.change(inputs[0], { target: { value: 'спортивное' } });

        const updatedModel = ref.current!.getModel();

        expect(updatedModel.paramValues).toEqual([
            { paramId: 1, value: 'спортивное' },
            { paramId: 2, value: 'макси' },
        ]);
    });
});
