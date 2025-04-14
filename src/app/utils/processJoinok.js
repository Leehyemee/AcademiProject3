import Swal from 'sweetalert2';

export const processJoinok = async (formValues, setIsLoading) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/stdnt/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formValues)
        });

        setIsLoading(false);

        if (response.ok) {
            Swal.fire({
                title: '회원가입 완료! 로그인 페이지로 이동합니다.',
                html: '※ 메일 인증 후 로그인해주세요. ※',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => location.href = "/pageLogin");
        } else if (response.status === 400) {
            const errorText = await response.text();
            Swal.fire({ title: '입력 오류', text: errorText, icon: 'error' });
        } else {
            Swal.fire({ title: '회원가입 실패!', text: '다시 시도해주세요.', icon: 'error' });
        }
    } catch (error) {
        setIsLoading(false);
        Swal.fire({ title: '서버 오류!', text: '관리자에게 문의해주세요.', icon: 'error' });
    }
};