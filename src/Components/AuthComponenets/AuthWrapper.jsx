export default function AuthWrapper({children}) {
    return (
        <div className="auth-wrapper" style={{
            height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
            {children}
        </div>
    )
}