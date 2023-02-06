import {useNavigate} from "react-router-dom"
import {Field, FieldError, FieldLabel, Form, Input, useForm} from "../../../global/components/Form/index.js";
import {useCreateUserQuery} from "../../api/queries.js";
import {useState} from "react";
import {ROLES} from "../../api/index.js";
import * as yup from "yup";

const STATES = {
    DEFAULT: 0,
    SUCCESS: 1,
    ERROR: 2,
};


export default () => {
    const navigate = useNavigate();
    const query = useCreateUserQuery();
    const [state, setState] = useState(STATES.DEFAULT);

    const handleSubmit = (data) => {
        data.role = ROLES.MANAGER;

        query.mutate(data, {
            onSuccess: () => {
                setState(STATES.SUCCESS);
                setTimeout(() => {
                    navigate("/panel/manager");
                }, 1000);
            },
            onError: () => setState(STATES.ERROR),
            onSettled: () => setTimeout(() => setState(STATES.DEFAULT), 3000),
        });
    };

    const form = useForm({
        values: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            specialization: "",
        },

        schema: yup.object({
            email: yup.string().email("Неверная электронная почта").required("Это поле обязательное!"),
        }),

        onSubmit: handleSubmit,
    });

    return (
        <>
            <div className="p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto flex justify-center">

                    <Form
                        params={form}
                        className="bg-gray-100 rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6 lg:w-1/2"
                    >
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <div className="text-gray-600 pb-8">
                                <p className="font-medium text-2xl">Добавить Менеджера</p>
                                <p>Заполните все поля</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                    <Field className="block md:col-span-3 ">
                                        <FieldLabel>Имя</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            name="name"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700"/>
                                    </Field>

                                    <Field className="block md:col-span-3">
                                        <FieldLabel>Фамилия</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            name="surname"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700"/>
                                    </Field>

                                    <Field className="block md:col-span-6">
                                        <FieldLabel>Телефон</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            name="phone"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700"/>
                                    </Field>

                                    <Field className="block md:col-span-6">
                                        <FieldLabel>Почта</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="компания@gmail.com"
                                            name="email"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700"/>
                                    </Field>

                                    <Field className="block md:col-span-6">
                                        <FieldLabel>Специализация</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            name="specialization"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700"/>
                                    </Field>

                                    <div className="md:col-span-6 flex flex-row justify-between ">
                                        <div className="inline-flex items-end">
                                            <button onClick={() => navigate("/panel/manager")}
                                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl">Отменить
                                            </button>
                                        </div>

                                        <div className="inline-flex items-end">
                                            <button
                                                className="bg-[#007282] hover:bg-[#005F6D] text-white font-bold py-2 px-4 rounded-xl">Добавить
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    )
}