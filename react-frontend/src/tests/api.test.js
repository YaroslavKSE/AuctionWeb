// api.test.js
import axios from 'axios';
import * as api from '../api';

jest.mock('axios');

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register_ValidInput_ReturnsUserData', async () => {
    // Arrange
    const mockResponse = { data: { user_id: '123', message: 'User created successfully' } };
    axios.post.mockResolvedValue(mockResponse);
    const email = 'test@example.com';
    const password = 'password123';
    const name = 'John';
    const surname = 'Doe';

    // Act
    const result = await api.register(email, password, name, surname);

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/auth/register', { email, password, name, surname });
    expect(result).toEqual(mockResponse.data);
  });

  test('login_ValidCredentials_ReturnsSuccessMessage', async () => {
    // Arrange
    const mockResponse = { data: { message: 'User logged in successfully' } };
    axios.post.mockResolvedValue(mockResponse);
    const email = 'test@example.com';
    const password = 'password123';

    // Act
    const result = await api.login(email, password);

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/auth/login', { email, password });
    expect(result).toEqual(mockResponse.data);
  });

  test('logout_AuthenticatedUser_ReturnsSuccessMessage', async () => {
    // Arrange
    const mockResponse = { data: { message: 'User logged out successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    // Act
    const result = await api.logout();

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/auth/logout');
    expect(result).toEqual(mockResponse.data);
  });

  test('getListings_NoParameters_ReturnsListingsArray', async () => {
    // Arrange
    const mockListings = [{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }];
    axios.get.mockResolvedValue({ data: mockListings });

    // Act
    const result = await api.getListings();

    // Assert
    expect(axios.get).toHaveBeenCalledWith('/listings');
    expect(result).toEqual(mockListings);
  });

  test('createListing_ValidData_ReturnsCreatedListing', async () => {
    // Arrange
    const mockResponse = { data: { listing_id: '123', message: 'Listing created successfully' } };
    axios.post.mockResolvedValue(mockResponse);
    const listingData = { title: 'New Item', description: 'Description', starting_bid: 100 };

    // Act
    const result = await api.createListing(listingData);

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/listings', listingData);
    expect(result).toEqual(mockResponse.data);
  });

  test('getListingById_ValidId_ReturnsListingDetails', async () => {
    // Arrange
    const mockListing = { id: '123', title: 'Item', description: 'Description' };
    axios.get.mockResolvedValue({ data: mockListing });
    const listingId = '123';

    // Act
    const result = await api.getListingById(listingId);

    // Assert
    expect(axios.get).toHaveBeenCalledWith(`/listings/${listingId}`);
    expect(result).toEqual(mockListing);
  });

  test('placeBid_ValidBid_ReturnsBidConfirmation', async () => {
    // Arrange
    const mockResponse = { data: { message: 'Bid placed successfully' } };
    axios.post.mockResolvedValue(mockResponse);
    const listingId = '123';
    const amount = 150;

    // Act
    const result = await api.placeBid(listingId, amount);

    // Assert
    expect(axios.post).toHaveBeenCalledWith(`/bids/${listingId}/place`, { amount });
    expect(result).toEqual(mockResponse.data);
  });

  test('addToWatchlist_ValidListingId_ReturnsConfirmation', async () => {
    // Arrange
    const mockResponse = { data: { message: 'Listing added to watchlist' } };
    axios.post.mockResolvedValue(mockResponse);
    const listingId = '123';

    // Act
    const result = await api.addToWatchlist(listingId);

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/watchlist/add', { listing_id: listingId });
    expect(result).toEqual(mockResponse.data);
  });

  test('fetchUserWatchlist_AuthenticatedUser_ReturnsWatchlistItems', async () => {
    // Arrange
    const mockWatchlist = [{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }];
    axios.get.mockResolvedValue({ data: { listings: mockWatchlist } });

    // Act
    const result = await api.fetchUserWatchlist();

    // Assert
    expect(axios.get).toHaveBeenCalledWith('/watchlist');
    expect(result).toEqual(mockWatchlist);
  });

  test('removeFromWatchlist_ValidListingId_ReturnsConfirmation', async () => {
    // Arrange
    const mockResponse = { data: { message: 'Listing removed from watchlist' } };
    axios.post.mockResolvedValue(mockResponse);
    const listingId = '123';

    // Act
    const result = await api.removeFromWatchlist(listingId);

    // Assert
    expect(axios.post).toHaveBeenCalledWith('/watchlist/remove', { listing_id: listingId });
    expect(result).toEqual(mockResponse.data);
  });

  test('getUserListings_AuthenticatedUser_ReturnsUserListings', async () => {
    // Arrange
    const mockListings = [{ id: '1', title: 'My Item 1' }, { id: '2', title: 'My Item 2' }];
    axios.get.mockResolvedValue({ data: mockListings });

    // Act
    const result = await api.getUserListings();

    // Assert
    expect(axios.get).toHaveBeenCalledWith('/listings/user');
    expect(result).toEqual(mockListings);
  });

  test('closeListing_ValidListingId_ReturnsClosedListingConfirmation', async () => {
    // Arrange
    const mockResponse = { data: { message: 'Listing closed successfully' } };
    axios.post.mockResolvedValue(mockResponse);
    const listingId = '123';

    // Act
    const result = await api.closeListing(listingId);

    // Assert
    expect(axios.post).toHaveBeenCalledWith(`/listings/${listingId}/close`);
    expect(result).toEqual(mockResponse.data);
  });
  test('register_InvalidInput_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Registration failed';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });
    const email = 'invalid@example.com';

    // Act & Assert
    await expect(api.register(email, 'password', 'name', 'surname')).rejects.toEqual(errorMessage);
  });

  test('login_InvalidCredentials_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Invalid credentials';
    axios.post.mockRejectedValue({ response: { data: { error: errorMessage } } });

    // Act & Assert
    await expect(api.login('wrong@example.com', 'wrongpassword')).rejects.toThrow(errorMessage);
  });

  test('logout_Unauthenticated_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'User not authenticated';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });

    // Act & Assert
    await expect(api.logout()).rejects.toEqual(errorMessage);
  });

  test('getListings_ServerError_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Internal server error';
    axios.get.mockRejectedValue({ response: { data: errorMessage } });

    // Act & Assert
    await expect(api.getListings()).rejects.toThrow(errorMessage);
  });

  test('createListing_InvalidData_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Invalid listing data';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });
    const invalidListingData = {};

    // Act & Assert
    await expect(api.createListing(invalidListingData)).rejects.toThrow(Error(errorMessage));
  });

  test('placeBid_InsufficientAmount_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Bid amount too low';
    axios.post.mockRejectedValue({ response: { data: { error: errorMessage } } });
    const listingId = '123';
    const lowAmount = 1;

    // Act & Assert
    await expect(api.placeBid(listingId, lowAmount)).rejects.toThrow(errorMessage);
  });

  test('addToWatchlist_AlreadyInWatchlist_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Listing already in watchlist';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });
    const listingId = '123';

    // Act & Assert
    await expect(api.addToWatchlist(listingId)).rejects.toEqual(errorMessage);
  });

  test('fetchUserWatchlist_Unauthenticated_ThrowsError', async () => {
    // Arrange
    axios.get.mockRejectedValue(new Error('Failed to fetch watchlist'));

    // Act & Assert
    await expect(api.fetchUserWatchlist()).rejects.toThrow('Failed to fetch watchlist');
  });

  test('fetchWatchlistIds_ServerError_ThrowsError', async () => {
    // Arrange
    axios.get.mockRejectedValue(new Error('Failed to fetch watchlist IDs'));

    // Act & Assert
    await expect(api.fetchWatchlistIds()).rejects.toThrow('Failed to fetch watchlist IDs');
  });

  test('removeFromWatchlist_NotInWatchlist_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Listing not in watchlist';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });
    const listingId = '123';

    // Act & Assert
    await expect(api.removeFromWatchlist(listingId)).rejects.toEqual(errorMessage);
  });

  test('getUserListings_Unauthenticated_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'User not authenticated';
    axios.get.mockRejectedValue({ response: { data: errorMessage } });

    // Act & Assert
    await expect(api.getUserListings()).rejects.toEqual(errorMessage);
  });

  test('closeListing_NotOwner_ThrowsError', async () => {
    // Arrange
    const errorMessage = 'Not authorized to close this listing';
    axios.post.mockRejectedValue({ response: { data: errorMessage } });
    const listingId = '123';

    // Act & Assert
    await expect(api.closeListing(listingId)).rejects.toEqual(errorMessage);
  });
});