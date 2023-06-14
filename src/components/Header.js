export const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.headerText}>
                G's Drive
            </h1>
            <p style={styles.headerSubText}>
                A file manager created by gsierra19
            </p>
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    },
    headerText: {
        fontSize: '30px',
    },
    headerSubText: {
        fontSize: '15px',
    }
}