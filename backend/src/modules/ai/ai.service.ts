import Groq from 'groq-sdk';
import productRepository from '../product/product.repository';
import { ApiError } from '../../utils/ApiError';

class AIService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async recommendProducts(query: string) {
    // 1. Fetch products to provide context
    const products = await productRepository.findAll();
    const productContext = products.map(p => ({
      id: p._id,
      name: p.name,
      description: p.description,
      price: p.price
    }));

    // 2. Query Groq
    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are the ShopSphere AI Concierge. Your goal is to help users find luxury products based on natural language queries. 
          Given a list of products and a user query, respond with a JSON object containing an "ids" array of product IDs that best match the query. 
          Respond ONLY with a JSON object in this format: {"ids": ["ID1", "ID2"]}. No other text.`
        },
        {
          role: 'user',
          content: `Products: ${JSON.stringify(productContext)}\n\nQuery: ${query}`
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    try {
      const result = JSON.parse(completion.choices[0]?.message?.content || '{"ids": []}');
      const matchedIds = result.ids || [];
      
      // 3. Fetch full product details for matches
      const matchedProducts = products.filter(p => matchedIds.includes(p._id.toString()));
      return matchedProducts;
    } catch (err) {
      console.error('AI Parsing Error:', err);
      throw new ApiError(500, 'AI failed to process recommendation');
    }
  }
}

export default new AIService();
