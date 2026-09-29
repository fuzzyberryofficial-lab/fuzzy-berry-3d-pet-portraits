import { getInstagramPosts } from "@/lib/adminData";
import DeleteButton from "@/components/admin/DeleteButton";
import InstagramPostForm from "@/components/admin/InstagramPostForm";
import { deleteInstagramPostAction } from "./actions";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

export default async function AdminInstagramPage() {
  const posts = await getInstagramPosts();

  return (
    <div className={tableStyles.section}>
      <h2 className={tableStyles.sectionTitle}>Instagram Posts</h2>
      <p className={tableStyles.empty} style={{ marginBottom: 18 }}>
        These posts show up in the &quot;Follow @fuzzyberry.official&quot; carousel on the homepage. Paste a post or
        reel link from the Instagram app&apos;s share menu to add one; changes go live within a minute.
      </p>

      <InstagramPostForm />

      {posts.length === 0 ? (
        <p className={tableStyles.empty}>No posts yet — add one above.</p>
      ) : (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Post</th>
              <th>Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <a href={post.permalink} target="_blank" rel="noopener">
                    {post.permalink}
                  </a>
                </td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td>
                  <DeleteButton
                    id={post.id}
                    action={deleteInstagramPostAction}
                    confirmText="Remove this post from the homepage carousel?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
