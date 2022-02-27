// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableDelegateProxy {}

/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 MAX_ELEMENTS;
    string BASE_TOKEN_URI;
    bool paused = false;

    address proxyRegistryAddress;

    constructor(
        string memory _BASE_TOKEN_URI,
        uint256 _MAX_ELEMENTS,
        address _proxyRegistryAddress
    ) ERC721("Item", "ITM") {
        proxyRegistryAddress = _proxyRegistryAddress;
        BASE_TOKEN_URI = _BASE_TOKEN_URI;
        MAX_ELEMENTS = _MAX_ELEMENTS;
    }

    modifier onlyMintable() {
        require(
            _tokenIds.current() < MAX_ELEMENTS,
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

    function pause(bool status) public onlyOwner {
        paused = status;
    }

    function mint(address player) public onlyMintable returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
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
