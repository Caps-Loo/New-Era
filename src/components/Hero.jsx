import React from "react";
import Background from "../assets/Background.png";

const Hero = () => {
return(
<>
    <section className="min-h-[550px] sm:min-h-[600px]
        bg-custom-yellow flex justify-center items-center">
        <div className="container pb-8 sm:pb-0">
            <div className="grid grid-cols-1
        sm:grid-cols-2 gap-8">
                <div>
                    <h1 className="text-4xl font-bold font-cursive">Cari Kerja #makin mudah</h1>
                    <span className="text-4xl font-bold">Pake GoHire</span>
                    <p>
                        {""}
                        GoHire adalah situs lowongan kerja internal
                        berbasis software fokus dibidang rekrutmen
                        untuk mempermudah cari pekerjaan dan
                        perekrutan karyawan.
                    </p>
                </div>
                <div>
                    <img src={Background} className="max-w[450px] sm:scale-125 shadow-1 " />
                </div>
            </div>
        </div>
    </section>
</>
)
}

export default Hero;
