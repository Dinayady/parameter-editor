import { ParamEditor, type Model, type Param, } from './components/ParamEditor';

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
]

const model: Model = {
  colors: [],
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
}

export function App() {
  return (
    <>
      <ParamEditor params={params} model={model} />
    </>
  )
};
