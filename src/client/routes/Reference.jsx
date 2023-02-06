import React from "react";
import { Disclosure } from "@headlessui/react";

const FAQ = () => {
    return (
        <div>
            <div className="w-full bg-white rounded-xl px-8 mx-auto mt-20 space-y-2 shadow lg:max-w-md">
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">Как создать заявку ?</summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                            Для того чтобы создать заявку...
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        Как оставлять отзыв?
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                        В бета-версии этой платформы возможность добавлять отзывы не добавлена
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        Как добавить несколько услуг к заявке?
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                        Добавить несколько услуг возможно при создании заявки либо можно создать новую заявку с услугами
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg">
                    <summary className="font-semibold">
                        Как стать миллионером
                    </summary>
                    <div className="mt-3">
                        <p className="text-sm leading-6 text-gray-600">
                        Много работать
                        </p>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default FAQ;

