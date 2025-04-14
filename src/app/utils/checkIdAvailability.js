export const checkIdAvailability = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/stdnt/check-id?stdntId=${id}`);
        if (response.ok) {
            const data = await response.json();
            return data.isAvailable;
        } else {
            throw new Error('아이디 중복 확인 실패');
        }
    } catch (error) {
        console.error('서버 오류:', error);
        Swal.fire({ title: '서버 오류', text: '아이디 중복 여부를 확인할 수 없습니다.', icon: 'error' });
        return null;
    }
};