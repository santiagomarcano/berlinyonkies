// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract OwnableDelegateProxy {}

/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract TheBadYonkies is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 MAX_ELEMENTS;
    string BASE_TOKEN_URI;
    uint256 PRICE;
    bool paused = false;

    event Minted(address player, uint256 tokenId);

    address proxyRegistryAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _BASE_TOKEN_URI,
        uint256 _MAX_ELEMENTS,
        uint256 _PRICE,
        address _proxyRegistryAddress
    ) ERC721(_name, _symbol) {
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

    function freeMint(address player)
        public
        onlyMintable
        onlyOneFreeMint
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
