export default async function Page({ params }) {
    const { category } = await params
    return (
        <div>
            <h1>Category: {category}</h1>
        </div>
    );
}