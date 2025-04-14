import Image from 'next/image';

const LogoSection = () => (
    <div className="logo-wrap">
        <Image
            src="/assets/img/academiLogo.png"
            alt="academi Logo"
            className="logo-img"
            width={200}
            height={100}
        />
    </div>
);

export default LogoSection;
