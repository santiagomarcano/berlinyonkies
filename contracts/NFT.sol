// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract OwnableDelegateProxy {}

/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract BerlinYonkies is ERC721URIStorage, IERC2981, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 MAX_ELEMENTS;
    string BASE_TOKEN_URI;
    uint256 PRICE;
    bool paused = false;
    address public beneficiary;
    address public royalties;

    event Minted(address player, uint256 tokenId);

    address proxyRegistryAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royalties,
        address _beneficiary,
        string memory _BASE_TOKEN_URI,
        uint256 _MAX_ELEMENTS,
        uint256 _PRICE,
        address _proxyRegistryAddress
    ) ERC721(_name, _symbol) {
        royalties = _royalties;
        beneficiary = _beneficiary;
        proxyRegistryAddress = _proxyRegistryAddress;
        BASE_TOKEN_URI = _BASE_TOKEN_URI;
        MAX_ELEMENTS = _MAX_ELEMENTS;
        PRICE = _PRICE;
    }

    mapping(address => bool) private freeMints;

    modifier onlyOneFreeMint() {
        require(freeMints[msg.sender] == false, "Maxed freemint");
        _;
    }

    modifier onlyMintable() {
        require(
            _tokenIds.current() <= MAX_ELEMENTS,
            "Can't exceed MAX_ELEMENTS"
        );
        require(paused == false, "Sorry, paused minting :(");
        _;
    }

    function contractURI() public view returns (string memory) {
        return BASE_TOKEN_URI;
    }

    function baseTokenURI() public view returns (string memory) {
        return BASE_TOKEN_URI;
    }

    function getMaxElements() public view returns (uint256) {
        return MAX_ELEMENTS;
    }

    function getStatus() public view returns (bool) {
        return paused;
    }

    function getPrice() public view returns (uint256) {
        return PRICE;
    }

    function pause(bool status) public onlyOwner {
        paused = status;
    }

    function withdraw() public onlyOwner {
        payable(beneficiary).transfer(address(this).balance);
    }

    function freeMint(address player)
        public
        onlyMintable
        onlyOneFreeMint
        nonReentrant
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        freeMints[msg.sender] = true;
        _safeMint(player, newItemId);
        _setTokenURI(
            newItemId,
            string(
                bytes.concat(
                    bytes(BASE_TOKEN_URI),
                    "/",
                    bytes(Strings.toString(newItemId))
                )
            )
        );
        emit Minted(msg.sender, newItemId);
        return newItemId;
    }

    function mint(address player)
        public
        payable
        onlyMintable
        nonReentrant
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        freeMints[msg.sender] = true;
        console.log(msg.value, PRICE);
        require(msg.value >= PRICE, "Insuficient amount");
        _safeMint(player, newItemId);
        _setTokenURI(
            newItemId,
            string(
                bytes.concat(
                    bytes(BASE_TOKEN_URI),
                    "/",
                    bytes(Strings.toString(newItemId))
                )
            )
        );
        emit Minted(msg.sender, newItemId);
        return newItemId;
    }

    // ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // IERC2981
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address, uint256 royaltyAmount)
    {
        _tokenId; // silence solc warning
        royaltyAmount = (_salePrice / 100) * 5;
        return (royalties, royaltyAmount);
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}
