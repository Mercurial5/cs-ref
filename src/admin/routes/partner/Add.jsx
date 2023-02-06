import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateUserQuery } from "../../api/queries.js";
import { ROLES } from "../../api/index.js";
import {
    useForm,
    Form,
    Field,
    FieldLabel,
    FieldError,
    Input,
    Select,
} from "../../../global/components/Form";
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
        data.role = ROLES.PARTNER;

        query.mutate(data, {
            onSuccess: () => {
                setState(STATES.SUCCESS);
                setTimeout(() => {
                    navigate("/panel/partner");
                }, 1000);
            },
            onError: () => setState(STATES.ERROR),
            onSettled: () => setTimeout(() => setState(STATES.DEFAULT), 3000),
        });
    };

    const form = useForm({
        values: {
            company_name: "",
            company_type: "",
            email: "",
            IIN: "",
            code: "",
        },

        schema: yup.object({
            company_name: yup.string().required("Это поле обязательное!"),
            company_type: yup.string(),
            email: yup.string().email("Неверная электронная почта").required("Это поле обязательное!"),
            IIN: yup.string().max(15, "Максимальная длина 15 символов"),
            code: yup.string(),
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
                                <p className="font-medium text-2xl">Добавить партнера</p>
                                <p>Заполните все поля</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                    <Field className="block md:col-span-6 ">
                                        <FieldLabel>Название компании</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            name="company_name"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700" />
                                    </Field>

                                    <Field className="block md:col-span-3">
                                        <FieldLabel>Форма Организации</FieldLabel>
                                        <Select
                                            options={[
                                                { value: "ТОО", text: "ТОО" },
                                                { value: "ИП", text: "ИП" },
                                                { value: "АО", text: "АО" },
                                            ]}
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            name="company_type"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700" />
                                    </Field>

                                    <Field className="block md:col-span-3">
                                        <FieldLabel>Почта</FieldLabel>
                                        <Input
                                            type="text"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="компания@gmail.com"
                                            name="email"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700" />
                                    </Field>

                                    <Field className="block md:col-span-3">
                                        <FieldLabel>ИИН</FieldLabel>
                                        <Input
                                            type="number"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            name="IIN"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700" />
                                    </Field>

                                    <Field className="block md:col-span-3">
                                        <div htmlFor="code">КОД</div>
                                        <Input
                                            type="number"
                                            className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            name="code"
                                        />
                                        <FieldError className="my-2 text-sm text-rose-700" />
                                    </Field>

                                    <Field className="block md:col-span-6">
                                        <FieldLabel>Договор</FieldLabel>
                                        <Input
                                            type="file"
                                            className="block h-10 mt-1 rounded w-full text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 file:text-sm file:font-medium hover:file:bg-violet-100"
                                            placeholder="Прикрепите договор"
                                            name="contract"
                                        />
                                    </Field>

                                    <div className="md:col-span-6 flex flex-row justify-between ">
                                        <div className="inline-flex items-end">
                                            <button
                                                onClick={() => navigate("/panel/partner")}
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
                                            >
                                                Отменить
                                            </button>
                                        </div>

                                        <div className="inline-flex items-end">
                                            <button
                                                className="bg-[#007282] hover:bg-[#005F6D] text-white font-bold py-2 px-4 rounded-xl"
                                                type="submit"
                                                disabled={state !== STATES.DEFAULT}
                                            >
                                                {state === STATES.SUCCESS
                                                    ? "Добавлено"
                                                    : state === STATES.ERROR
                                                        ? "Не добавлено"
                                                        : "Добавить"}
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
    );
};
