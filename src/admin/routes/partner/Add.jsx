
import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto flex justify-center">

                    <div className="bg-gray-100 rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6 lg:w-1/2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                            <div className="text-gray-600 pb-8">
                                <p className="font-medium text-2xl">Добавить партнера</p>
                                <p>Заполните все поля</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">


                                    <div className="md:col-span-3">
                                        <label htmlFor="name">Имя</label>
                                        <input type="text" name="name" id="name" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="surname">Фамилия</label>
                                        <input type="text" name="surname" id="surname" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    </div>

                                    <div className="md:col-span-3 ">
                                        <label htmlFor="full_name">Название компании</label>
                                        <input type="text" name="full_name" id="full_name" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                    <div className="md:col-span-3 ">
                                        <label htmlFor="phone">Телефон</label>
                                        <input type="tel" name="phone" id="phone" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="OrganizationForm">Форма Организации</label>
                                        <select name="OrganizationForm" id="address" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                            <option>ТОО</option>
                                            <option>ИП</option>
                                            <option>АО</option>
                                            <option>Другое</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="email">Почта</label>
                                        <input type="text" name="email" id="email" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="компания@gmail.com" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="IIN">ИИН</label>
                                        <input type="number" name="IIN" id="IIN" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label htmlFor="code">КОД</label>
                                        <input type="number" name="code" id="code" className="outline-none h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                    </div>

                                    <div className="md:col-span-6">
                                        <label htmlFor="contract">Договор</label>
                                        <input type="file"
                                               className="block h-10 mt-1 rounded w-full text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 file:text-sm file:font-medium hover:file:bg-violet-100"
                                               placeholder="Прикрепите договор"></input>
                                    </div>

                                    <div className="md:col-span-6 flex flex-row justify-between ">
                                        <div className="inline-flex items-end">
                                            <button onClick={() => navigate("/panel/partner")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl">Отменить</button>
                                        </div>
            
                                        <div className="inline-flex items-end">
                                            <button className="bg-[#007282] hover:bg-[#005F6D] text-white font-bold py-2 px-4 rounded-xl">Добавить</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}