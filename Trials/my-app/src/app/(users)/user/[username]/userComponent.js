const UserComponent = async (props) => {
    const username = await props.username;
    const email = await props.email;
    const number = await props.number;
    console.log(props);
    return (
        <main className="page-container">
            <h1 className="heading-lg">
                This is the user component for {username}.
            </h1>
            <div className="text-muted max-w-lg">
                <div>
                    User: {username}
                </div>
                <div>
                    Email: {email}
                </div>
                <div>
                    Number: {number}
                </div>
            </div>
        </main>
    );
};

export default UserComponent;
