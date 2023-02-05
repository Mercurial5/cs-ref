import Ayazhan_tg_img from "/tg/Ayazhan_tg_photo.jpg"
import Dias_tg_img from "/tg/Dias_tg_photo.jpg"

const HelpView = () => (
    <div className="flex flex-col">
        <span className="lg:text-xl text-lg font-semibold">Связаться с техподдержкой:</span>

        <div className="flex justify-around w-100">
            <div className="bg-white rounded-xl w-1/3 flex flex-row my-4 px-4">
                <img src={Ayazhan_tg_img} className="rounded-full lg:w-20 lg:h-20 w-14 h-14 my-4 mr-2"></img>
                <div className="flex flex-col lg:pt-6 pt-4 lg:text-lg text-sm">
                    <span className="font-medium ">Айтжанова Аяжан</span>
                    <a href="https://t.me/mee_alpaca"><span className="font-medium">Telegram:</span> @mee_alpaca</a>
                </div>
            </div>

            <div className="bg-white rounded-xl w-1/3 flex flex-row my-4 px-4">
                <img src={Dias_tg_img} className="rounded-full lg:w-20 lg:h-20 w-14 h-14 my-4 mr-2"></img>
                <div className="flex flex-col lg:pt-6 pt-4 lg:text-lg text-sm">
                    <span className="font-medium">Неспаев Диас</span>
                    <a href="https://t.me/mercurial5"><span className="font-medium">Telegram:</span> @mercurial5</a>
                </div>

            </div>
        </div>


    </div>

);

export default HelpView;
