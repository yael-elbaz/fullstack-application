using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using WebApplication2.Model;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {

        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "posts.json");

        [HttpGet]
        public IActionResult GetPosts()
        {
            var posts = ReadPostsFromFile();
            return Ok(posts);
        }


        // POST: api/Post
        [HttpPost]
        public IActionResult AddPost([FromBody] Post newPost)
        {
            List<Post> posts = ReadPostsFromFile();
            newPost.Id = posts.Max(p => p.Id) + 1; // Auto-increment ID
            posts.Add(newPost);
            WritePostsToFile(posts);
            return Ok(newPost);
        }



        // PUT: api/Post/{id}
        [HttpPut("{id}")]
        public IActionResult EditPost(int id, [FromBody] Post updatedPost)
        {
            var posts = ReadPostsFromFile();
            var post = posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
                return NotFound("Post not found");

            // Update post properties
            post.Title = updatedPost.Title;
            post.Content = updatedPost.Content;
            post.Author = updatedPost.Author;
            post.Place = updatedPost.Place;
            post.Category = updatedPost.Category;

            WritePostsToFile(posts);
            return Ok(post);
        }

        // Utility Methods
        private List<Post> ReadPostsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
                return new List<Post>();

            var json = System.IO.File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Post>>(json) ?? new List<Post>();
        }

        private void WritePostsToFile(List<Post> posts)
        {
            var json = JsonSerializer.Serialize(posts, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_filePath, json);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var posts = ReadPostsFromFile();

            var post = posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
                return NotFound("Post not found");

            posts.Remove(post); // Remove the post from the list
            WritePostsToFile(posts); // Update the JSON file

            return Ok(new { message = "Post deleted successfully", post });
        }

    }

   

}
