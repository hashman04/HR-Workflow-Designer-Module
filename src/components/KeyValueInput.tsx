import React from 'react';
import { useFieldArray, Control, UseFormRegister } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

interface KeyValueInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    name: string;
    label: string;
}

const KeyValueInput: React.FC<KeyValueInputProps> = ({ control, register, name, label }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex space-x-2">
                        <input
                            {...register(`${name}.${index}.key`)}
                            placeholder="Key"
                            className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                        <input
                            {...register(`${name}.${index}.value`)}
                            placeholder="Value"
                            className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ key: '', value: '' })}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                    <Plus size={16} className="mr-1" />
                    Add Field
                </button>
            </div>
        </div>
    );
};

export default KeyValueInput;
