let data: any = [];
export const getData = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }

}

export const getAvatar = async (name: string) => {
    try {
        const res = await fetch(`https://api.dicebear.com/7.x/initials/svg?seed=${name}`);
        const data = res.text();
        return data;
    }
    catch (error) {
        console.log("Error in fetching data");
    }
}

